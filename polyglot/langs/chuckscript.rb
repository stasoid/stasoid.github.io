#based on the python impl by Potato44
#import re;code=open('f').read();m=re.search(r'\[0\]\{(\d+)\}',code);a=bin(int(m.group(1)))[3:];print(''.join([chr(int(x,2))for x in re.findall('.{8}',a)]))

#puts `cat f`[/\[0\]\{(\d+)\}/,1].to_i.to_s(2)[1..-1].scan(/.{8}/).map{|x|x.to_i(2).chr}.join

code = `cat f`

# ,1 # the first parenthesized subgroup
n = code[/\[0\]\{(\d+)\}/, 1].to_i

# to_s(2) convert an integer to a binary string, 3.to_s(2) == '11'
a = n.to_s(2)[1..-1] # [1..-1] chop off first 1, same as [1:] in Python

js = a.scan(/.{8}/).map{|x| x.to_i(2).chr}.join

puts js


