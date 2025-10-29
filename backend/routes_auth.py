from fastapi import APIRouter, HTTPException, status, Depends, Header
from typing import Optional
from bson import ObjectId
from datetime import datetime
from schemas import UserRegister, UserLogin, UserResponse, Token
from database import get_users_collection, get_reports_collection
from auth import hash_password, verify_password, create_access_token, verify_token

router = APIRouter(prefix="/api/auth", tags=["authentication"])


def get_current_user(authorization: Optional[str] = Header(None)):
    """Extract and verify current user from JWT token."""
    if not authorization:
        return None
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            return None
        
        payload = verify_token(token)
        user_id = payload.get("sub")
        if not user_id:
            return None
        
        users_collection = get_users_collection()
        if users_collection is None:
            return None
        
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return None
        
        return user
    except:
        return None


@router.post("/register", response_model=Token)
async def register(user_data: UserRegister):
    """Register a new user."""
    users_collection = get_users_collection()
    
    if users_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    # Check if user already exists
    existing_user = users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = hash_password(user_data.password)
    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "password_hash": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    result = users_collection.insert_one(new_user)
    user_id = str(result.inserted_id)
    
    # Create JWT token
    access_token = create_access_token(data={"sub": user_id, "email": user_data.email})
    
    user_response = UserResponse(
        _id=user_id,
        name=user_data.name,
        email=user_data.email,
        created_at=new_user["created_at"]
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user_response
    )


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    """Login user and return JWT token."""
    users_collection = get_users_collection()
    
    if users_collection is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available"
        )
    
    # Find user by email
    user = users_collection.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user.get("password_hash", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    user_id = str(user["_id"])
    
    # Create JWT token
    access_token = create_access_token(data={"sub": user_id, "email": user_data.email})
    
    user_response = UserResponse(
        _id=user_id,
        name=user["name"],
        email=user["email"],
        created_at=user["created_at"]
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user_response
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(authorization: Optional[str] = Header(None)):
    """Get current logged-in user info."""
    user = get_current_user(authorization)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    return UserResponse(
        _id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        created_at=user["created_at"]
    )


@router.post("/logout")
async def logout():
    """Logout user (token invalidation handled on frontend)."""
    return {"message": "Logged out successfully"}


@router.get("/verify")
async def verify_user(authorization: Optional[str] = Header(None)):
    """Verify if user is authenticated."""
    user = get_current_user(authorization)
    if not user:
        return {"authenticated": False}
    
    return {
        "authenticated": True,
        "user_id": str(user["_id"]),
        "email": user["email"],
        "name": user["name"]
    }
