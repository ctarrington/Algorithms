function createLinkedList()
{
	var firstNode = null;
	var lastNode = null;

	var singleLinkedList = {	

		add: function(theValue) {
			var newNode = {
				value: theValue,
				next: null
			};

			if (firstNode === null)
			{
				firstNode = newNode;
				lastNode = newNode;
			}
			else
			{
				lastNode.next = newNode;
				lastNode = newNode;
			}
		},

		addToFront: function(theValue) {
			var newNode = {
				value: theValue,
				next: firstNode
			};

			firstNode = newNode;
		},

		remove: function() {
			if (firstNode === null) { return; }

			var previous = null;
			var current = firstNode;
			var last = false;
			while (!last)
			{
				if (current.next === null)
				{
					last = true;
					if (previous === null)
					{
						firstNode = null;
						lastNode = null;
					}
					else
					{
						lastNode = previous;
						previous.next = null;
					}
				}
				else
				{
					previous = current;
					current = current.next;
				}
			}
		},

		reverse: function() {
			var reversed = createLinkedList();

			var it = this.iterator();
			var done = false;			
			while (!done)
			{
				var c = it.next();
				if (c === null) 
				{
					done = true;
				}
				else
				{
					reversed.addToFront(c);
				}
			}

			return reversed;
		},

		clear: function() {
			firstNode = null;
			lastNode = null;
		},

		iterator: function() {
			var it = {
				current: null,
				next: function() {
					if (this.current === null)
					{
						this.current = firstNode;						
					}
					else
					{
						this.current = this.current.next;
					}

					return (this.current) ? this.current.value : null;
				}
			};

			return it;
		}

	};

	return singleLinkedList;

}