
C = bar
B = 20
app $(C) : A = 10
app:
	echo $A $B



bar : 
	echo $A
