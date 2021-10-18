def fun(a, b)
    print "Hello World" + a.to_s + b.to_s
    print("Hello World" + a.to_s + b.to_s)
end

def fact(n)
    if n <= 2
        print n
    end
    result = Array.new
    result[0], result[1] = [1, 2]
    (3..(n - 1)).to_a.each do |i|
        result[i - 1] = i * result[i - 2]
    end
    print result[n - 1]
end

# print fact(5)

