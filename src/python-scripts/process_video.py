import sys
import cv2
import torch
import json

def process_video(video_path):
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  # YOLOv5 pre-trained model
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    detections = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame_count += 1
        if frame_count % 10 == 0:  # Process every 10th frame
            results = model(frame)
            for detection in results.xyxy[0]:
                label = model.names[int(detection[-1])]
                if label in ['knife', 'gun']:
                    detections.append({
                        'label': label,
                        'confidence': float(detection[4]),
                        'frame': frame_count,
                    })
    cap.release()
    return detections

if __name__ == "__main__":
    video_path = sys.argv[1]
    detections = process_video(video_path)
    print(json.dumps(detections))  # Return JSON data
