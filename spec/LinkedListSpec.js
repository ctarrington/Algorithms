describe("Single Linked List", function() {

	it("add to end and iterate", function() {
		var ll = createLinkedList();
		ll.add('one');
		ll.add('two');
		ll.add('three');


		var iterator = ll.iterator();
		expect(iterator.next()).toEqual('one');
		expect(iterator.next()).toEqual('two');
		expect(iterator.next()).toEqual('three');
		expect(iterator.next()).toBeNull();
	});

	it("add to end and front and iterate", function() {
		var ll = createLinkedList();
		ll.add('two');
		ll.add('three');
		ll.addToFront('one');


		var iterator = ll.iterator();
		expect(iterator.next()).toEqual('one');
		expect(iterator.next()).toEqual('two');
		expect(iterator.next()).toEqual('three');
		expect(iterator.next()).toBeNull();
	});

	it("remove from end", function() {
		var ll = createLinkedList();
		ll.add('one');
		ll.add('two');
		ll.add('three');
		ll.remove();

		var iterator = ll.iterator();
		expect(iterator.next()).toEqual('one');
		expect(iterator.next()).toEqual('two');
		expect(iterator.next()).toBeNull();
	});

	it("remove all from end", function() {
		var ll = createLinkedList();
		ll.add('one');
		ll.add('two');
		ll.add('three');
		ll.remove();
		ll.remove();
		ll.remove();

		var iterator = ll.iterator();
		expect(iterator.next()).toBeNull();

		ll.remove();
	});

	it("clear", function() {
		var ll = createLinkedList();
		ll.add('one');
		ll.add('two');
		ll.add('three');
		ll.clear();

		var iterator = ll.iterator();
		expect(iterator.next()).toBeNull();
	});

	it("iterators are distinct", function() {
		var ll = createLinkedList();
		ll.add('one');
		ll.add('two');
		ll.add('three');

		var iterator1 = ll.iterator();
		var iterator2 = ll.iterator();

		expect(iterator1.next()).toEqual('one');
		expect(iterator1.next()).toEqual('two');
		expect(iterator2.next()).toEqual('one');
		expect(iterator1.next()).toEqual('three');		
		expect(iterator2.next()).toEqual('two');
		expect(iterator2.next()).toEqual('three');
	});

	it("reverse works", function() {
		var ll = createLinkedList();
		ll.add('one');
		ll.add('two');
		ll.add('three');

		var rll = ll.reverse();

		var iterator = ll.iterator();
		var riterator = rll.iterator();

		expect(iterator.next()).toEqual('one');
		expect(iterator.next()).toEqual('two');
		expect(iterator.next()).toEqual('three');

		expect(riterator.next()).toEqual('three');
		expect(riterator.next()).toEqual('two');
		expect(riterator.next()).toEqual('one');
	});

});