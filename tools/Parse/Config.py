# coding = utf-8

import configparser
import os

# 配置文件
CONFIG_FILE_PATH = os.getcwd() + "\\" + "Config.ini"

class Config( configparser.ConfigParser ):

	def __new__(cls):
		# 关键在于这，每一次实例化的时候，我们都只会返回这同一个instance对象
		if not hasattr(cls, 'instance'):
			cls.instance = super(Config, cls).__new__(cls)
		return cls.instance

	# 构造
	def __init__( self ):
		# 配置文件解析器对象
		self.m_config = configparser.ConfigParser()
		# 配置文件路径
		self.m_path = CONFIG_FILE_PATH

		self.load()

	# 销毁
	def destroy(self):
		self.m_config = None
		self.m_path = None

	# 生成配置文件ini
	def makeConfigFile( self ):
		fd = open( self.m_path, "w" )
		fd.close()

	# 清理配置对象
	def clearConcifgObj( self ):
		for section in self.m_config.sections():
			self.m_config.remove_section( section )

	# 加载
	def load( self ):
		if not os.path.exists( self.m_path ):
			self.makeConfigFile()

		try:
			self.m_config.read( self.m_path )
		except configparser.ParsingError:
			self.makeConfigFile()
			self.clearConcifgObj()

	# 删除section
	def removeSection( self, section ):
		self.m_config.remove_section( section )

	# 删除option
	def removeOption( self, section, option ):
		self.m_config.remove_option( section, option )

	# 添加section
	def addSection( self, section ):
		self.m_config.add_section( section )


	# 设置option
	def set( self, section, optionK, optionV ):
		self.m_config.set( section, optionK, optionV )
		with open( self.m_path, "w" ) as fd:
			self.m_config.write( fd )
			fd.close()


	# 获取option
	def get( self, section, option ):
		try:
			return self.m_config.get( section, option )
		except configparser.NoSectionError:
			self.addSection( section )

		value = input("输入需要解析的Protocol文件路径地址：\n")
		self.set(section, option, value)
		with open( self.m_path, "w" ) as fd:
			self.m_config.write( fd )
			fd.close()
		return value
