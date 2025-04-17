from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from user_model import User, Base, engine, SessionLocal, UserCreate

router = APIRouter()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/register')
def register(user: UserCreate, db: Session = Depends(get_db)):
    user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get('/login/{username}', response_model=UserCreate)
def get_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user