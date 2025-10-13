#!/bin/bash

set -e

echo "Начинаю установку Flutter(3.35.5) и Android SDK (35.0.0)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

if [ ! -d "$PREFIX" ] || [ -z "$(command -v apt)" ]; then
    error "Этот скрипт предназначен для запуска в Termux!"
    exit 1
fi

FLUTTER_URL="https://github.com/yamsergey/yamsergey.termux.flutter/releases/download/3.35.5/flutter_3.35.5_aarch64.deb"
ANDROID_SDK_URL="https://github.com/mumumusuc/termux-android-sdk/releases/download/35.0.0/android-sdk_35.0.0_aarch64.deb"

TEMP_DIR="$HOME/temp_install"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

info "Обновляем список пакетов..."
apt update

info "Устанавливаем необходимые зависимости..."
apt install -y wget apt dart

info "Скачиваем Flutter..."
wget -q --show-progress "$FLUTTER_URL" -O flutter.deb

info "Скачиваем Android SDK..."
wget -q --show-progress "$ANDROID_SDK_URL" -O android-sdk.deb

info "Устанавливаем Android SDK..."
apt install -y ./android-sdk.deb

info "Устанавливаем Flutter..."
apt install -y ./flutter.deb

info "Настраиваем Flutter..."
flutter config --android-sdk "$PREFIX/opt/android-sdk"

info "Принимаем лицензии Android SDK..."
yes | "$PREFIX/opt/android-sdk/tools/bin/sdkmanager" --licenses

info "Очищаем временные файлы..."
cd "$HOME"
rm -rf "$TEMP_DIR"

info "Проверяем установку..."
echo -e "\n${GREEN}✅ Установка завершена!${NC}"
echo "Проверяем версии:"

if command -v flutter &> /dev/null; then
    echo -e "${GREEN}Flutter:$(flutter --version | head -1)${NC}"
else
    error "Flutter не установлен правильно"
fi

if [ -d "$PREFIX/opt/android-sdk" ]; then
    echo -e "${GREEN}Android SDK: Установлен в $PREFIX/opt/android-sdk${NC}"
else
    error "Android SDK не установлен правильно"
fi

echo -e "\n${YELLOW}Дополнительные шаги:${NC}"
echo "1. Перезапустите Termux или выполните: source ~/.bashrc"
echo "2. Для создания проекта: flutter create my_app"
echo "3. Для запуска: cd my_app && flutter run"

echo -e "\n${GREEN}Текущие настройки Flutter:${NC}"
flutter config
