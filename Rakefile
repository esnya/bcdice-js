# -*- coding: utf-8 -*-
$:.unshift File.dirname(__FILE__) + '/BCDice/src'

require 'base64'
require 'opal'
require 'pathname'
require 'rake/testtask'
require 'rake/clean'
require 'diceBot/DiceBotLoader'
require 'diceBot/DiceBotLoaderList'
require 'TableFileData'

task :default => :build

GEN_DIR = 'generated'
directory GEN_DIR
CLEAN.include(GEN_DIR)

DIST_DIR = 'dist'
directory DIST_DIR
CLEAN.include(DIST_DIR)


desc 'Convert converted Ruby codes'
task :genRubyCodes => GEN_DIR do
  Encoding.default_external = 'UTF-8'

  Dir.glob('BCDice/src/**/*.rb').each do |src|
    dst = (Pathname.new('generated') / Pathname.new(src).relative_path_from(Pathname.new('BCDice/src'))).to_s
    dir = File.dirname(dst)

    unless (FileTest.directory?(dir))
      FileUtils.mkdir_p(dir)
    end

    File.write(dst, File.read(src).gsub(/=begin.*?=end/m, '').gsub(/require ['"](.*?)\.rb['"]/, 'require "\1"'))
  end
end

desc 'Generate DiceBot loader'
task :genDiceBotLoader => GEN_DIR do

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
    def self.generateStaticDiceBotLoader()
      File.open(GEN_DIR + '/StaticDiceBotLoader.rb', 'w') do |file|
        DiceBotLoader.getFilenames.each do |filename|
          file.puts("require 'diceBot/" + filename + "'")
        end
      end
    end

    def self.generateStaticDiceBotLoaderList()
      File.open(GEN_DIR + '/StaticDiceBotLoaderList.rb', 'w') do |file|
        file.puts("class StaticDiceBotLoaderList")
        file.puts("  BOT_NAMES = [")

        DiceBotLoader.getFilenames.each do |filename|
          file.puts("    '#{filename}',")
        end

        file.puts("  ]")
        file.puts("  def self.getBotNames()")
        file.puts("    BOT_NAMES")
        file.puts("  end")
        file.puts("end")
      end
    end
  end

  DiceBotLoaderList.generateStaticDiceBotLoader()
  DiceBotLoaderList.generateStaticDiceBotLoaderList()
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

task :build => [:transpile, :opal] do
end

desc 'Build JavaScript code'
task :transpile => [:generate, DIST_DIR] do
  builder = Opal::Builder.new
  builder.append_paths('.', './generated', './stub')
  File.binwrite 'dist/bcdice.ruby.js', 'require(\'./opal\')(function(Opal){' + builder.build('./bcdicejs.rb').to_s + '})'
end

desc 'Build Opal'
task :opal => [DIST_DIR] do
  builder = Opal::Builder.new
  File.binwrite 'dist/opal.ruby.js', "var Wrapper = {};\n(function(){\n" + builder.build('./opaljs.rb').to_s.gsub(/(def\.length = nil)/, '// \1') + "}).call(Wrapper);\nmodule.exports = Wrapper.Opal;"
end
