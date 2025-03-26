import os
import json
import csv
import random
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
from pathlib import Path

def load_api_keys():
    """Load and validate Gemini API keys from environment variables."""
    load_dotenv()
    api_keys = [os.environ.get(f'GEMINI_API_KEY{i}') for i in range(1, 6)]
    api_keys = [key for key in api_keys if key]
    return api_keys

def process_font_image(image_path):
    """Load and process a font image."""
    try:
        img = Image.open(image_path)
        # Ensure image is in a format the model accepts (e.g., RGB)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        return img
    except FileNotFoundError:
        raise FileNotFoundError(f"Font image not found at: {image_path}")
    except Exception as e:
        raise Exception(f"Error loading image '{image_path}': {str(e)}")

def generate_font_tags(model, prompt, image, api_keys, max_retries=15):
    """Generate tags for the font using Gemini API with retry mechanism."""
    retries = 0
    last_exception = None
    response = None
    
    while retries < max_retries:
        try:
            response = model.generate_content(
                [prompt, image],
                generation_config=genai.types.GenerationConfig(
                    # You can keep these if you want to fine-tune generation per call
                    temperature=1.0,
                    top_p=0.95,
                    top_k=40,
                    max_output_tokens=8192
                ),
            )
            return json.loads(response.text)
        except json.JSONDecodeError as e:
            print(f"Attempt {retries+1}/{max_retries}: Error decoding JSON response: {e}")
            print(f"Raw response text: {getattr(response, 'text', 'N/A')}")
            last_exception = Exception("Failed to parse JSON response from Gemini.") 
        except Exception as e:
            # Catch other potential API errors (e.g., rate limits, blocked prompts)
            print(f"Attempt {retries+1}/{max_retries}: Error during Gemini API call: {e}")
            # Log response parts if available for debugging
            if response:
                if hasattr(response, 'parts'):
                    print(f"Response parts: {response.parts}")
                if hasattr(response, 'prompt_feedback'):
                    print(f"Prompt Feedback: {response.prompt_feedback}")
            last_exception = e
        
        # Increment retry counter
        retries += 1
        
        # If we haven't reached max retries, try with a different API key
        if retries < max_retries:
            # Select a new random API key
            api_key = random.choice(api_keys)
            print(f"Retrying with a different API key (ending with ...{api_key[-4:] if api_key else 'None'})")
            genai.configure(api_key=api_key)
            
            # Create a new model instance with the new API key
            model_being_used = 'gemini-2.5-pro-exp-03-25'
            model = genai.GenerativeModel(
                model_being_used,
                generation_config={"response_mime_type": "application/json"}
            )
    
    # If we've exhausted all retries, raise the last exception
    print("API Key limits seem to be exhausted after 15 retry attempts")
    if last_exception:
        raise last_exception

def main():
    try:
        # Process fonts from CSV
        json_file_path = '/Volumes/1700 APFS/Programming/WebDev_Cohort_Chaicode/extras/font_tags_pro.json'

        # Load existing tags if file exists
        tags = {}
        if Path(json_file_path).exists():
            try:
                with open(json_file_path, 'r') as json_file:
                    tags = json.load(json_file)
            except json.JSONDecodeError:
                print(f"Warning: Could not decode existing JSON file at {json_file_path}. Starting fresh.")
                tags = {} # Start with empty dict if file is corrupt
        
        # Initialize prompt for font analysis
        prompt = "Analyze the provided font image and generate comprehensive, one-word tags that describe it. Organize the tags into a nested JSON object with the following structure:\n{\n  \"font_type\": {\n    \"category\": [\"serif\", \"sans-serif\", \"script\", or \"display\"],\n    \"subcategory\": [\"...\"],\n    \"style\": [\"...\"]\n  },\n  \"appearance\": {\n    \"shape\": [\"...\"],\n    \"texture\": [\"...\"]\n  },\n  \"feeling\": {\n    \"general\": [\"...\"],\n    \"specific\": [\"...\"]\n  },\n  \"usage\": {\n    \"context\": [\"...\"],\n    \"purpose\": [\"...\"]\n  }\n}\nBe as comprehensive as possible within each category, providing multiple relevant tags (aim for 3-5 tags per field where applicable). Prioritize accuracy and clarity in your descriptions. Use only one-word tags. Do not include any introductory or concluding text, only output the raw JSON."

        processed_fonts_count = 0
        csv_file_path = '/Volumes/1700 APFS/Programming/WebDev_Cohort_Chaicode/extras/font_data.csv'

        # Get API keys ONCE before the loop
        api_keys = load_api_keys()
        if not api_keys:
            raise ValueError("No valid API keys found in environment variables (GEMINI_API_KEY1, GEMINI_API_KEY2, ...)")

        # Process each font from the CSV file
        with open(csv_file_path, 'r', encoding='utf-8') as csv_file: # Added encoding
            csv_reader = csv.reader(csv_file)
            try:
                next(csv_reader)  # Skip header row
            except StopIteration:
                print("Warning: CSV file is empty or contains only a header.")
                return # Exit if no data rows

            for row in csv_reader:
                if not row: # Skip empty rows
                    continue

                # Select one random key from the list FOR EACH FONT
                api_key = random.choice(api_keys)
                genai.configure(api_key=api_key)
                # print(f"Using API Key ending with: ...{api_key[-4:]}") # Optional: Debug which key is used

                # Initialize model FOR EACH FONT with JSON output config
                model_being_used = 'gemini-2.5-pro-exp-03-25' # Updated model name
                print(f"Using model: {model_being_used}")
                # *** THE FIX IS HERE ***
                model = genai.GenerativeModel(
                    model_being_used,
                    # Ensure the model knows to output JSON directly
                    generation_config={"response_mime_type": "application/json"}
                )

                try:
                    font_hash = row[0]
                    font_name = row[1]
                    font_img_path_relative = row[2] # Assuming this is relative to the 'extras' dir

                    # Skip if font has already been processed
                    if font_hash in tags:
                        print(f"Skipping already processed font: {font_name} ({font_hash})")
                        processed_fonts_count = len(tags)  # Update count based on total processed fonts
                        print(f"Total fonts processed: {processed_fonts_count}")
                        continue # Skip to next font
                    
                    # Select one random key from the list FOR EACH FONT
                    api_key = random.choice(api_keys)
                    genai.configure(api_key=api_key)
                    # print(f"Using API Key ending with: ...{api_key[-4:]}") # Optional: Debug which key is used

                    # Initialize model FOR EACH FONT with JSON output config
                    model_being_used = 'gemini-2.5-pro-exp-03-25' # Updated model name
                    print(f"Using model: {model_being_used}")
                    # *** THE FIX IS HERE ***
                    model = genai.GenerativeModel(
                        model_being_used,
                        # Ensure the model knows to output JSON directly
                        generation_config={"response_mime_type": "application/json"}
                    )

                    # Construct absolute image path
                    base_dir = '/Volumes/1700 APFS/Programming/WebDev_Cohort_Chaicode/extras/'
                    image_path = os.path.join(base_dir, font_img_path_relative)

                    print(f"\nProcessing Font: {font_name}")
                    print(f"Image path: {image_path}")

                    # Process image and generate tags
                    image = process_font_image(image_path)
                    font_tags = generate_font_tags(model, prompt, image, api_keys)

                    # Store and save tags
                    tags[font_hash] = font_tags
                    with open(json_file_path, 'w') as json_file:
                        json.dump(tags, json_file, indent=2)

                    processed_fonts_count = len(tags) # Count keys in the tags dict for accuracy
                    print(f"Successfully processed {font_name}.")
                    print(f"Total fonts processed: {processed_fonts_count}")
                    print(f"Tags saved to: {json_file_path}")

                except FileNotFoundError as e:
                    print(f"Skipping font {font_name} due to image error: {e}")
                    continue # Continue to the next font
                except Exception as e:
                    print(f"Skipping font {font_name} due to an unexpected error during processing: {e}")
                    # Consider adding failed hashes to a separate list/log if needed
                    continue # Continue to the next font

    except FileNotFoundError as e:
        print(f"Error: Required file not found: {str(e)}")
    except ValueError as e:
         print(f"Configuration Error: {str(e)}")
    except Exception as e:
        print(f"An unexpected error occurred in main: {str(e)}")
        import traceback
        traceback.print_exc() # Print full traceback for unexpected errors

if __name__ == "__main__":
    main()