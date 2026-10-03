 BASE = old 
 LIST := initial
 
 LIST += $(BASE)
 
 BASE = new

 app: 
	echo $(LIST)