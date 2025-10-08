import os
import json

TRANSLATIONS_DIR = "translations"
OUTPUT_JS = "js/translations.js"

translations = {}
languages = []

# collecting all json files
for filename in os.listdir(TRANSLATIONS_DIR):
    if filename.endswith(".json"):
        lang_code = filename.split(".")[0]
        languages.append(lang_code)
        with open(os.path.join(TRANSLATIONS_DIR, filename), "r", encoding="utf-8") as f:
            translations[lang_code] = json.load(f)

# generating JS
js_content = f"const translations = {json.dumps(translations, ensure_ascii=False, indent=2)};\n"
js_content += f"const availableLanguages = {json.dumps(languages)};\n"

os.makedirs(os.path.dirname(OUTPUT_JS), exist_ok=True)
with open(OUTPUT_JS, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"translations.js created languages: {languages}")

