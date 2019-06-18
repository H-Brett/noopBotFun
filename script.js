const canvas = document.querySelector('#page'); 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let starter = 0; 
let dataArray = []; 

const fetchFunction = async () => {
	let colorFetch = await fetch(`https://api-noopbots.lightboard.io/hexbot?count=100`);
	let colorResp = await colorFetch.json(); 
	let colorData = await colorResp;

	let coordFetch = await fetch(`https://api-noopbots.lightboard.io/vexbot?height=${window.innerHeight}&width=${window.innerWidth}&count=100`);
	let coordResp = await coordFetch.json(); 
	let coordData = await coordResp;

	let combinedData = coordData.vectors.map((vector, i) => {
		return {
			x: vector.a.x,
			y: vector.a.y,
			radius: vector.speed,
			color: colorData.colors[i].value, 
		}
	})

	dataArray = combinedData; 

}	

// const drawLine = (data, color) => {
// 	let { a: pointA, b: pointB } = data; 
// 	ctx.beginPath(); 
// 	ctx.strokeStyle = color;
// 	ctx.moveTo(pointA.x, pointA.y); 
// 	ctx.lineTo(pointB.x , pointB.y);
// 	ctx.stroke();
// }

const drawCircle = () => {
	let { x, y, color, radius } = dataArray[starter]; 
	ctx.beginPath(); 
	ctx.fillStyle = color; 
	ctx.arc(x, y, radius, 0, Math.PI * 2)
	ctx.fill(); 
	starter++; 
}

fetchFunction(); 
if(dataArray){
	setInterval(drawCircle, 1000); 
}
