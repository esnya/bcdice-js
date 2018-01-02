require 'opal'
require 'opal/platform'

class Object
  def freeze
    self
  end
end

class FileTest
  def self.directory?(path)
    true
  end
end

class String
  def toutf8
    self
  end
end
