import logging
import time
from abc import ABC, abstractmethod

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

def get_logger(name: str, level: str = 'INFO'):
    """Create a logger instance with a given name and level."""
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, level.upper()))
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger

class LoggerMixin(ABC):
    @abstractmethod
    def get_logger(self):
        pass

class TimeLogger(LoggerMixin):
    def __init__(self, logger: logging.Logger, name: str = 'Execution Time'):
        self.logger = logger
        self.name = name

    def __enter__(self):
        self.start_time = time.time()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end_time = time.time()
        self.execution_time = self.end_time - self.start_time
        self.logger.info(f'{self.name}: {self.execution_time:.2f} seconds')