import shutil
import os

CWD = os.getcwd()
ORIGIN_FILE_PATH = os.path.dirname( CWD ) + "\\build_templates\\wx-downloader.js"
TARGET_FILE_PATH = os.path.dirname( CWD ) + "\\build\\wechatgame\\libs\\"

def cp_downloader_file():
	shutil.copy( ORIGIN_FILE_PATH, TARGET_FILE_PATH )

def main():
	cp_downloader_file()

if __name__ == "__main__":
	main()