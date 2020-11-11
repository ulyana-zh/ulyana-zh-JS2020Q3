
var f15 = {
	//случайный набор с 0 в конце
	order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function() {
		return Math.random()-0.5;
	}).concat(0),
	// перестановка ячеек
	swap: function(i1, i2) {
		var t = this.order[i1];
		this.order[i1] = this.order[i2];
		this.order[i2] = t;
	},
	// проверка на решаемость
	solvable: function(a) {
		//для каждого элемента массива
		for (var kDisorder = 0, i = 1, len = a.length-1; i < len; i++){
			//узнаём сколько предшествующих элементов больше текущего
			for (var j = i-1; j >= 0; j--){
				//если один из предыдущих элементов больше - накручиваем счетчик
				if (a[j] > a[i]){
					kDisorder++;
				}
			}
		}

		//если сумма вышла четной - комбинация имеет решение
		return !(kDisorder % 2);
	}
};

// Если пазл нерешаемый, делаем его решаемым.
if (!f15.solvable(f15.order)){
	f15.swap(0, 1);
}

document.body.appendChild(document.createTextNode(f15.order));