# coding = utf-8

import re
import operator
import Config
import Define

class SProtoParser:

	# 构造
	def __init__( self, path ):
		# 路径
		self.m_path = path
		# 文件描述符
		self.m_fd = None
		# 文件内容
		self.m_content = []
		# 配置
		self.m_config = Config.Config()

		self.load()

	# 加载
	def load( self ):
		try:
			self.m_fd = open( self.m_path, "r", encoding="UTF-8" )

			protocolPath = self.m_config.get( Define.Section["Path"], Define.Option["ProtocolInput"], "输入需要解析的Protocol文件路径地址：\n" )
			if not operator.eq( protocolPath, self.m_path ):
				self.m_config.set( Define.Section["Path"], Define.Option["ProtocolInput"], self.m_path )

			for line in self.m_fd.readlines():
				self.m_content.append( line.strip() )
			self.m_fd.close()
		except:
			self.m_path = input( "重新输入需要解析的Protocol文件路径地址：\n" )
			self.load()

	# 正则表达式处理
	def regular(self, str):
		return str.replace( "#", "//" )

	# 获取解析结果
	def getResult(self):
		content = ""
		for lineContent in self.m_content:
			content = content + self.regular( lineContent ) + "\n"
		return content

	# 解析
	def parse( self ):
		outputPath = self.m_config.get( Define.Section["Path"], Define.Option["ProtocolOutput"], "导出解析文件到指定目录：\n" ) + "\\Protocol.js"
		fd = open(outputPath, "w", encoding="UTF-8")
		fd.write( self.getResult() )
		fd.close()

		# for index in range( len( self.m_content ) ):
		# 	print( self.m_content[index] )


