from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid object id")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "securepass123"
            }
        }


class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@example.com",
                "password": "securepass123"
            }
        }


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    name: str
    email: str
    created_at: datetime

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "name": "John Doe",
                "email": "john@example.com",
                "created_at": "2025-10-29T12:00:00"
            }
        }


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "_id": "507f1f77bcf86cd799439011",
                    "name": "John Doe",
                    "email": "john@example.com",
                    "created_at": "2025-10-29T12:00:00"
                }
            }
        }


class ReportCreate(BaseModel):
    molecule_name: str
    data: dict


class ReportResponse(BaseModel):
    id: str = Field(alias="_id")
    user_id: Optional[str] = None
    molecule_name: str
    data: dict
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True


class ReportUpdate(BaseModel):
    data: dict
    updated_at: datetime = Field(default_factory=datetime.utcnow)
