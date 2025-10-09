import os
import json

TRANSLATIONS_DIR = "translations"
OUTPUT_JS = "js/translations.js"

translations = {}
languages = []
language_display_names = {}

# collecting all json files
for filename in os.listdir(TRANSLATIONS_DIR):
    if filename.endswith(".json"):
        lang_code = filename.split(".")[0]
        file_path = os.path.join(TRANSLATIONS_DIR, filename)

        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        translations[lang_code] = data

        display_name = data.get("displayName", lang_code)
        language_display_names[lang_code] = display_name

        languages.append(lang_code)

# generating JS
js_content = (
    f"const translations = {json.dumps(translations, ensure_ascii=False, indent=2)};\n"
    f"const availableLanguages = {json.dumps(languages, ensure_ascii=False)};\n"
    f"const languageDisplayNames = {json.dumps(language_display_names, ensure_ascii=False, indent=2)};\n"
)

# creating folder js if needed
os.makedirs(os.path.dirname(OUTPUT_JS), exist_ok=True)
with open(OUTPUT_JS, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"translations.js created with languages: {languages}")
print(f"display names: {language_display_names}")
