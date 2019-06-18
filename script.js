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

	let coordFetch = await fetch(`https://api-noopbots.lightboard.io/vexbot?height=${window.innerHeight}&width=${window.innerWidth}&count=100&connected=1`);
	let coordResp = await coordFetch.json(); 
	let coordData = await coordResp;
	console.log(coordData);

	let combinedData = coordData.vectors.map((vector, i) => {
		return {
			aX: vector.a.x,
			aY: vector.a.y,
			bX: vector.b.x,
			bY: vector.b.y,
			radius: vector.speed,
			color: colorData.colors[i].value, 
		}
	})

	dataArray = combinedData; 

}	

const drawLine = () => {
	let { aX, aY, bX, bY, color } = dataArray[starter]; 
	ctx.beginPath(); 
	ctx.strokeStyle = color;
	ctx.moveTo(aX, aY); 
	ctx.lineTo(bX, bY);
	ctx.stroke();
	starter++;
}

const drawCircle = () => {
	let { aX, aY, color, radius } = dataArray[starter]; 
	ctx.beginPath(); 
	ctx.fillStyle = color; 
	ctx.arc(x, y, radius, 0, Math.PI * 2)
	ctx.fill(); 
	starter++; 
	// if(starter === dataArray.length) {
	// 	clearInterval(draw); 
	// 	starter = 0; 
	// }
}

fetchFunction(); 
if(dataArray){
	let draw = setInterval(drawLine, 500); 
}
