import logging
import logging.config
from os import path

_log_file_path = path.join(path.dirname(path.abspath(__file__)), 'log.conf')

print(path.dirname(path.abspath(__file__)))
logging.config.fileConfig(_log_file_path)


def get_logger(nom):
    '''returns a logger from the module that called the funcction'''
    return logging.getLogger(nom)
