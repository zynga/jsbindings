#!/usr/bin/python
# ----------------------------------------------------------------------------
# Plugin to generate better enums for cocos2d
#
# Author: Ricardo Quesada
# Copyright 2013 (C) Zynga, Inc
#
# License: MIT
# ----------------------------------------------------------------------------
'''
Plugin to generate better enums for cocos2d
'''

__docformat__ = 'restructuredtext'


# python modules
import re

# plugin modules
from generate_jsb import JSBGenerateEnums

#
#
# Plugin to generate better enums for cocos2d
#
#
class JSBGenerateEnums_CC(JSBGenerateEnums):
    pass


# Plugin that does nothing. Useful if you don't want to generate the enums
class JSBGenerateEnums_Ignore(JSBGenerateEnums):
    def generate_bindings(self):
        pass
