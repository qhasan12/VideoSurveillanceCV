try:
    from ultralytics import YOLO
    print("Ultralytics package is installed correctly.")
except ImportError as e:
    print(f"Error: {e}")
