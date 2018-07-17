# coding = utf-8

class SProtoParser:

	# 构造
	def __init__( self, path ):
		# 路径
		self.m_path = path
		# 文件描述符
		self.m_fd = None
		# 文件内容
		self.m_content = None

		self.load()

	# 加载
	def load( self ):
		self.m_fd = open( self.m_path, "r", encoding="UTF-8" )
		for line in self.m_fd.readlines():
			print( line.strip() )

	# 解析
	def parse( self ):
		print( "" )

