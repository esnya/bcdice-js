# -*- coding: utf-8 -*-
$:.unshift File.dirname(__FILE__) + '/BCDice/src'

require 'base64'
require 'opal'
require 'pathname'
require 'rake/testtask'
require 'rake/clean'
require 'diceBot/DiceBot'
require 'diceBot/DiceBotLoader'
require 'diceBot/DiceBotLoaderList'
require 'TableFileData'

task :default => :build

GEN_DIR = 'generated'
directory GEN_DIR
CLEAN.include(GEN_DIR)

DIST_DIR = 'lib'
directory DIST_DIR
CLEAN.include(DIST_DIR)

DIST_DICEBOT_DIR = 'lib/diceBot'
directory DIST_DICEBOT_DIR

def debug(*msg)
end

desc 'Convert converted Ruby codes'
task :genRubyCodes => GEN_DIR do
  Encoding.default_external = 'UTF-8'

  Dir.glob('BCDice/src/**/*.rb').each do |src|
    dst = (Pathname.new('generated') / Pathname.new(src).relative_path_from(Pathname.new('BCDice/src'))).to_s
    dir = File.dirname(dst)

    unless (FileTest.directory?(dir))
      FileUtils.mkdir_p(dir)
    end

    matchedReplacer = "\n" + (1 .. 20).map { |n| "__last__match__#{n} = $#{n}"}.join("\n") + "\n"

    File.write(
      dst,
      File.read(src)
        .gsub(/coding:utf-8-/, 'coding: utf-8 -')
        .gsub(/=begin.*?=end/m, '')
        .gsub(/require ['"](.*?)\.rb['"]/, 'require "\1"')
        .gsub(/^(\s*)([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)!\((.*)\)$/, '\1\2 = \2.\3(\4)')
        .gsub(/\$@/, '[]')
        .gsub(/(^|\s|[\(|={!\[])\$([0-9]+)/, '\1__last__match__\2')
        .gsub(/^(\s*unless(.*\/.*\/|[^\/]*=~).*\n)((.|\n)*?)end\n/, '\1\3end' + matchedReplacer)
        .gsub(/^(\s*while(.*\/.*\/|[^\/]*=~).*)$/, '\1' + matchedReplacer)
        .gsub(/^(\s*return.*unless(.*\/.*\/|[^\/]*=~).*)$/, '\1' + matchedReplacer)
        .gsub(/^(\s*nil unless(.*\/.*\/|[^\/]*=~).*)$/, '\1' + matchedReplacer)
        .gsub(/^(\s*if(.*\/.*\/|[^\/]*=~).*)$/, '\1' + matchedReplacer)
        .gsub(/^(\s*elsif(.*\/.*\/|[^\/]*=~).*)$/, '\1' + matchedReplacer)
        .gsub(/^(\s*when \/.*\/i?)$/, '\1' + matchedReplacer)
        .gsub(/^\s*\/.*\/.*=~.*$/, '\0' + matchedReplacer)
        .gsub(/\.gsub\(.*\)\s*{/, '\0' + matchedReplacer)
        .gsub(/\.sub\(.*\)\s*{/, '\0' + matchedReplacer)
        .gsub(/@@bcdice/, '@bcdice')
      )
  end
end

class DiceBotLoader
  def self.getFilenames()
    botFiles = Dir.glob('BCDice/src/diceBot/*.rb')
    botNames =
      botFiles.map { |botFile| File.basename(botFile, '.rb').untaint }
    validBotNames =
      # 特別な名前のものを除外する
      (botNames - BOT_NAMES_TO_IGNORE).
      # 正しいクラス名になるものだけ選ぶ
      select { |botName| /\A[A-Z]/ === botName }
  end
end

class DiceBotLoaderList
  def self.generateStaticDiceBotLoaderList()
    File.open(GEN_DIR + '/StaticDiceBotLoaderList.rb', 'w') do |file|
      file.puts("class StaticDiceBotLoaderList")
      file.puts("  BOT_NAMES = [")

      DiceBotLoader.getFilenames.each do |filename|
        loader = DiceBotLoaderList.find(filename)
        diceBot =
          if loader
            loader.loadDiceBot
          else
            DiceBotLoader.loadUnknownGame(filename)
          end
        file.puts("    ['#{filename}', '#{diceBot.gameType}', '#{diceBot.gameName}'],") if diceBot
      end

      file.puts("  ]")
      file.puts("  def self.getBotNames()")
      file.puts("    BOT_NAMES")
      file.puts("  end")
      file.puts("end")
    end
  end

  def self.generatePreloader()
    File.open(DIST_DIR + '/preload-dicebots.js', 'w') do |file|
      DiceBotLoader.getFilenames.each do |filename|
        file.puts("require('./diceBot/#{filename}');")
      end

      file.puts("require('./bcdice');")
      file.puts("var Opal = require('./opal').default; Opal.DiceBotResolver.$setMode('static');")
    end
  end
end

desc 'Generate DiceBot loader'
task :genDiceBotLoader => [GEN_DIR, DIST_DIR] do
  DiceBotLoaderList.generateStaticDiceBotLoaderList()
  DiceBotLoaderList.generatePreloader()
end

desc 'Generate extratables'
task :genExtratables => GEN_DIR do
  tableFileData = TableFileData.new

  tableData = []
  fileData = []
  Dir.glob('BCDice/extratables/*.txt').each do |filename|
    info = tableFileData.readGameCommandInfo(filename.untaint, '')
    gameType = info['gameType']
    gameType ||= ''
    command = info['command']

    infoDump = info.to_s
    tableData.push("tableData['#{gameType}_#{command}'] = #{infoDump}")

    fileDump = File.read(filename).toutf8.lines
      .map{ |line| line.strip.gsub(/"/, '\"') }
      .map{ |line| "\"#{line}\"" }
      .join(", ")
    fileData.push("fileData['#{filename.untaint}'] = [#{fileDump}].join(\"\\n\")")
  end

  File.open(GEN_DIR + '/StaticTableFileData.rb', 'w') do |file|
    file.write("# -*- coding: utf-8 -*-\n\n")
    file.write("class StaticTableFileData\n")

    file.write("  def self.getTableData()\n")
    file.write("    tableData = Hash.new\n")
    tableData.each do |line|
      file.write("    #{line}\n")
    end
    file.write("    tableData\n")
    file.write("  end\n")

    file.write("  def self.getFileData()\n")
    file.write("    fileData = Hash.new\n")
    fileData.each do |line|
      file.write("    #{line}\n")
    end
    file.write("    fileData\n")
    file.write("  end\n")

    file.write("end\n")
  end
end

desc 'Generate Ruby codes'
task :generate => [:genRubyCodes, :genDiceBotLoader, :genExtratables] do
end

task :build => [:transpile, :dicebot, :opal] do
end

desc 'Build JavaScript code'
task :transpile => [:generate, DIST_DIR] do
  builder = Opal::Builder.new
  builder.append_paths('.', './generated', './stub')
  File.binwrite 'lib/bcdice.ruby.js', 'var Opal = require(\'./opal\').default; ' + builder.build('./src/bcdice.rb').to_s
end

desc 'Build DiceBot JavaSciprtCode'
task :dicebot => [:generate, DIST_DICEBOT_DIR] do
  DiceBotLoader.getFilenames.each do |filename|
    src = GEN_DIR + '/diceBot/' + filename + '.rb'
    dst = DIST_DICEBOT_DIR + '/' + filename + '.js'
    path = Pathname.new(src).relative_path_from(Pathname.new(GEN_DIR)).to_s
    dst = (Pathname.new(DIST_DICEBOT_DIR) / Pathname.new(src).relative_path_from(Pathname.new(GEN_DIR + '/diceBot/'))).to_s.gsub(/rb$/, 'js')
    path = Pathname.new(src).relative_path_from(Pathname.new(GEN_DIR)).to_s
    className = Pathname.new(src).relative_path_from(Pathname.new(GEN_DIR + '/diceBot/')).to_s.gsub(/\.rb$/, '')
    builder = Opal::Builder.new
    builder.append_paths('.', './generated', './stub')
    File.binwrite dst, 'var Opal = require(\'../opal\').default; ' + builder.build(path).to_s
  end
end

desc 'Build Opal'
task :opal => [DIST_DIR] do
  builder = Opal::Builder.new
  jsCode = builder.build('./src/opal.rb').to_s
    .gsub(/((def|alias)\.length\s*=)/, '// \1')
  File.binwrite 'lib/opal.ruby.js', "var Wrapper = {};\n(function(){\n" + jsCode + "}).call(Wrapper);\nmodule.exports = Wrapper.Opal;"
end
