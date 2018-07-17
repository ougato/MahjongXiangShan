# coding = utf-8

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

		self.load()

	# 加载
	def load( self ):
		try:
			self.m_fd = open( self.m_path, "r", encoding="UTF-8" )

			config = Config.Config()
			protocolPath = config.get( Define.Section["Path"], Define.Option["Protocol"] )
			if not operator.eq( protocolPath, self.m_path ):
				config.set( Define.Section["Path"], Define.Option["Protocol"], self.m_path )

			for line in self.m_fd.readlines():
				self.m_content.append( line.strip() )
		except:
			self.m_path = input( "重新输入需要解析的Protocol文件路径地址：\n" )
			self.load()


	# 解析
	def parse( self ):
		for index in range( len( self.m_content ) ):
			print( self.m_content[index] )

