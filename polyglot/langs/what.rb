hh = {'!!!'=>'>','!!?'=>'<','!??'=>'+','???'=>'-','??!'=>'.','?!!'=>',','?!?'=>'[','!?!'=>']'}
# [65,66,67].pack('c*')=="ABC"
puts `cat f`.bytes.each_slice(3).map{|x| hh[x.pack'c*']}.join

# Using .bytes.each_slice(3) instead of .scan(/.{3}/nm) because /nm is not enough to match each byte,
# the string must be in a single-byte encoding, so .force_encoding("binary") must be used.
