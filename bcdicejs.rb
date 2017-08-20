require 'opal'
require 'opal/platform'
require 'native'

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

# def debug(*msg)
#     `console.log('debug>', #{msg})`
# end

########## Wrapper of BCDice ##########

def newBcDice(this)
    maker = BCDiceMaker.new
    bcdice = maker.newBcDice
    this.JS[:_bcdice] = bcdice
end

proto = Native::Object.new
proto.JS[:setDir] = -> (dir, prefix) {
    `throw new Error('Unsupported')`
    return nil
}
proto.JS[:isKeepSecretDice] = -> (b) {
    `this`.JS[:_bcdice].isKeepSecretDice(b)
}
proto.JS[:getGameType] = -> () {
    `this`.JS[:_bcdice].getGameType
}
proto.JS[:setDiceBot] = -> (diceBot) {
    return if (diceBot.nil?)
    `this`.JS[:_bcdice].setDiceBot(Object.const_get(diceBot).new)
}
proto.JS[:setIrcClient] = -> (client) {
    `throw new Error('Unimplemented')`
    `this`.JS[:_bcdice].setIrcClient(client)
}
proto.JS[:setMessage] = -> (message) {
    `this`.JS[:_bcdice].setMessage(message);
}
proto.JS[:dice_command] = -> () {
    `this`.JS[:_bcdice].dice_command
}
proto.JS[:setGameByTitle] = -> (gameTitle) {
    `this`.JS[:_bcdice].setGameByTitle(gameTitle)
}

%x{
    function BCDice() {
        #{ newBcDice(`this`) };
    }
    BCDice.prototype = #{ proto }
    module.exports = BCDice;
}
