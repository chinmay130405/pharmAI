from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "pharma_agent_ai")

try:
    client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    # Test the connection
    client.admin.command('ping')
    db = client[DB_NAME]
    print("✓ MongoDB connection successful")
except ServerSelectionTimeoutError:
    print("✗ MongoDB connection failed - Using local mode")
    db = None
except Exception as e:
    print(f"✗ MongoDB error: {e}")
    db = None

# Collections
def get_users_collection():
    if db is not None:
        return db.users
    return None

def get_reports_collection():
    if db is not None:
        return db.reports
    return None

# Create indexes
def create_indexes():
    try:
        if db is not None:
            db.users.create_index("email", unique=True)
            db.reports.create_index("user_id")
            db.reports.create_index("created_at")
            print("✓ Database indexes created")
    except Exception as e:
        print(f"Index creation warning: {e}")

create_indexes()
