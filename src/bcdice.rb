########## Ruby class patches ##########
require 'diceBot/DiceBot'
require 'StaticDiceBotLoaderList'
require 'StaticTableFileData'
require 'bcdiceCore'
require 'native'

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
        debug("getTableDataFromFile", fileName)

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
    def self.loadUnknownGame(gameTitle)
        debug("loadUnknownGame", gameTitle)

        escapedGameTitle = gameTitle.gsub(/(\.\.|\/|:|-)/, '_')

        begin
            DiceBotResolver.resolve(escapedGameTitle)
        rescue LoadError, StandardError => e
            debug("DiceBot load ERROR!!!", e.to_s)
            nil
        end
    end

    def self.collectDiceBotDescriptions
        StaticDiceBotLoaderList.getBotNames()
    end

    def self.collectDiceBots
        DiceBotLoader.collectDiceBotDescriptions.map { |botName|
            debug("collectDiceBots", botName)

            DiceBotResolver.resolve(botName[0])
        }
    end

    def loadDiceBot
        DiceBotResolver.resolveAll(@filenames, @diceBotClass)
    end
end

class DiceBotResolver
    @@mode = 'dynamic-require'
    @@loader = nil
    @@async = false
    @@cache = `{}`

    def self.getMode
        return @@mode
    end

    def self.setMode(mode)
        @@mode = mode
    end

    def self.load(filename)
        debug('nodeRequire', @@mode, filename)

        if (@@mode == 'dynamic-require')
            debug("require", filename)
        
            `var result = null`
            `try { result = require('./diceBot/' + #{filename}); } catch (e) { result = null; }`
        
            debug("require", `result ? 'done' : 'fail'`)
        
            `result`
        elsif (@@mode == 'custom')
            `#{@@loader}(filename)`
        elsif (@@mode == 'static')
            true
        else
            nil
        end
    end

    def self.loadAsync(filename)
        debug('loadAsync', filename)
        `(#{filename} in #{@@cache}) ? Promise.resolve(#{@@cache}[filename]) : #{@@loader}(filename)`
    end

    def self.createInstance(className)
        debug('createInstance', className)
        Object.const_get(className).new
    end

    def self.createInstanceAsync(className)
        `require('./opal')(function() { return #{DiceBotResolver.createInstance(className)}; })`
    end

    def self.resolve(className)
        if (@@async)
            `#{DiceBotResolver.loadAsync(className)}.then(function() { return #{DiceBotResolver.createInstanceAsync(className)}; })`
        else
            DiceBotResolver.load(className)
            DiceBotResolver.createInstance(className)
        end
    end

    def self.resolveAll(filenames, className)
        debug("resolveAll", filenames, className)

        if (@@async)
            `var results = []`
            filenames.each do |filename|
                `results.push(#{DiceBotResolver.loadAsync(filename)})`
            end

            %x{
                var result = Promise.all(results).then(function() {
                    return #{DiceBotResolver.createInstanceAsync(className)}
                });
            }

            `result`
        else
            filenames.each do |filename|
                DiceBotResolver.load(filename)
            end
            DiceBotResolver.createInstance(className)
        end
    end

    def self.setCustomLoader(loader, async)
        @@mode = 'custom'
        @@async = async
        @@loader = loader
    end

    def self.async?
        @@async
    end
end

# def debug(*msg)
#     `console.log('debug>', #{msg})`
# end
