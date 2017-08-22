########## Ruby class patches ##########
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

require 'diceBot/DiceBot'
require 'StaticDiceBotLoader'
require 'StaticDiceBotLoaderList'
require 'StaticTableFileData'
require 'bcdiceCore'

########## BCDice patches ##########
class TableFileData
    def setDir(dir, prefix = '')
        @tableData
    end

    def searchTableFileDefine()
        @fileData = StaticTableFileData.getFileData
        return StaticTableFileData.getTableData
    end

    def getTableDataFromFile(fileName)
        table = []
        lines = @fileData[fileName].toutf8.lines.map(&:chomp)
        
        defineLine = lines.shift
        dice, title = getDiceAndTitle(defineLine)
        
        lines.each do |line|
          key, value = getLineKeyValue(line)
          next if( key.empty? )
          
          key = key.to_i
          table << [key, value]
        end
        
        return dice, title, table
      end

      def readOneTableData(oneTableData)
        return if( oneTableData.nil? )
        return unless( oneTableData["table"].nil? )
        
        command = oneTableData["command"]
        gameType = oneTableData["gameType"]
        fileName = oneTableData["fileName"]
        
        return if( command.nil? )
        
        #return if( not File.exist?(fileName) )
        
        dice, title, table  = getTableDataFromFile(fileName)
        
        oneTableData["dice"] = dice
        oneTableData["title"] = title
        oneTableData["table"] = table
        
        return oneTableData
      end
end

class DiceBotLoader
    def self.collectDiceBots
        StaticDiceBotLoaderList.getBotNames().map { |botName|
            Object.const_get(botName).new
        }
    end
end

# def debug(*msg)
#     `console.log('debug>', #{msg})`
# end
