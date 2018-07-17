# coding = utf-8

import SProtoParser
import Config
import Define

def main():
	config = Config.Config()
	sprotoParser = SProtoParser.SProtoParser( config.get( Define.Section["Path"], Define.Option["Protocol"] ) )
	sprotoParser.parse()

if __name__ == "__main__":
	main()