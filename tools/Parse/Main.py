# coding = utf-8

import os
import configparser
import SProtoParser
import Config

# 配置文件
CONFIG_FILE_PATH = os.getcwd() + "\\" + "Config.ini"

def main():
	config = Config.Config( CONFIG_FILE_PATH )
	sprotoParser = SProtoParser.SProtoParser( config.get( "Path", "Protocol" ) )
	sprotoParser.parse()

if __name__ == "__main__":
	main()