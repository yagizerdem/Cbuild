
C = bar
B = 20
app $(C) : A = 10
app: A = 30
app:
	echo $A $B



bar : 
	echo $A
