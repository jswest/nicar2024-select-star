from transformers import CLIPProcessor, CLIPModel

image_model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32", cache_dir="./.models"
)
image_processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32", cache_dir="./.models"
)
