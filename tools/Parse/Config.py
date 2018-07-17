# coding = utf-8

import configparser
import os
import sys

class Config:

	# 构造
	def __init__( self, path ):
		# 配置文件解析器对象
		self.m_config = configparser.ConfigParser()
		# 配置文件路径
		self.m_path = path

		self.load()

	# 加载
	def load( self ):
		try:
			self.m_config.read( self.m_path )
		except:
			isMake = input( "配置文件已损坏 是否重新生成 y/n？" )
			if isMake == "y":
				fd = open( self.m_path, "w" )
				fd.close()
			else:
				exit()

	# 销毁
	def destroy( self ):
		self.m_config = None
		self.m_path = None

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


	# 获取option
	def get( self, section, option ):
		try:
			optionV = self.m_config.get( section, option )
		except:
			try:
				self.addSection( section )
			except:
				optionV = input( "输入需要解析的Protocol文件路径地址：" )
				self.set( section, option, optionV )
				fd = open( self.m_path, "w" )
				self.m_config.write( fd )
				fd.close()

		return optionV
