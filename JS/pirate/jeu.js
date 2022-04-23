function tableau2D(x,y){

	//Creation du tableau à deux entrées
	let Tab = new Array(x);
	for (var i = 0; i < Tab.length; i++)
	{
		console.log("salut")
		Tab[i] = new Array(y);
	}
	return Tab;

}

function tresor(tableau){

	
	//Creation des coordonées des malus et insertion dans le tableau
	for (let i=0;i<20;i++){
		a=Math.floor(Math.random() * 9 + 1) ;
		b=Math.floor(Math.random() * 9 + 1) ;
		tableau[a][b]="Malus"
	}


	//Creation des coordonées des bonus et insertion dans le tableau
	for (let i=0;i<20;i++){
		a=Math.floor(Math.random() * 9 + 1) ;
		b=Math.floor(Math.random() * 9 + 1) ;
		//Securité pour ne pas créer des bonus par dessus les malus
		while (tableau[a][b]=="Malus"){
			a=Math.floor(Math.random() * 9 + 1) ;
			b=Math.floor(Math.random() * 9 + 1) ;
		}
		tableau[a][b]="Bonus"
		
	}

	for (let i=0;i<2;i++){
		a=Math.floor(Math.random() * 9 + 1) ;
		b=Math.floor(Math.random() * 9 + 1) ;
		tableau[a][b]="Lapin"

	}

	//Creation des coordonées du Trésor et insertion dans le tableau
	x=Math.floor(Math.random() * 9 + 1) ;
	y=Math.floor(Math.random() * 9 + 1) ;

	tableau[x][y]="Tresor";

	return tableau

}

function restart(){
	setTimeout("location.reload(true);", 5);
}

function choix(v){
	
	//Coordonnées de la case actuel
	x=v.substr(0,1);
	y=v.substr(2);

	let xt=0;
	let yt=0;

	let ab=[]
	let cd=[]

	let lp=[]

	let temp=""
	xy = x+y

	//Recupération des coordonées du trésore
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Tresor"){
				xt=i;
				yt=j;
				tr=String(xt)+String(yt)
			}
		}
	}

	
	//Recupération des coordonées des bonus
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Bonus"){
				ia=String(i)
				ja=String(j)
				temp=ia+ja
				ab.push(temp)
			}
		}
	}

	//Recupération des coordonées des Malus
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Malus"){
				ia=String(i)
				ja=String(j)
				temp=ia+ja
				cd.push(temp)
			}
		}
	}

	//Recupération des coordonées des lapins
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Lapin"){
				ia=String(i)
				ja=String(j)
				temp=ia+ja
				lp.push(temp)
			}
		}
	}



	if (cases.includes(xy)){
		document.getElementById("score").innerHTML = "Vous avez déjà cherché ici";
	}
	else if (cases.includes(tr)) {
		document.getElementById("score").innerHTML = "Vous avez déjà gagné";
	}

	else{
		score=score+1;
		cases.push(xy)
		document.getElementById("score").innerHTML = "Votre score est de "+score;

		

	//Recupération des coordonées des bonus
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Bonus"){
				ia=String(i)
				ja=String(j)
				temp=ia+ja
				ab.push(temp)
			}
		}
	}

	//Recupération des coordonées des Malus
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Malus"){
				ia=String(i)
				ja=String(j)
				temp=ia+ja
				cd.push(temp)
			}
		}
	}

	//Recupération des coordonées des lapins
	for (let i=0;i<10;i++){
		for (let j=0;j<10;j++){
			if (tableau[i][j]=="Lapin"){
				ia=String(i)
				ja=String(j)
				temp=ia+ja
				lp.push(temp)
			}
		}
	}

	caseTable = document.getElementById(v)
	console.log(caseTable)
	//Attribution des différents évenements aux cases
	for (let q=0;q<20;q++){
		if (tableau[x][y]=="Tresor"){
			caseTable.setAttribute('class','good');
			document.getElementById("score").innerHTML = "Votre avez gagné avec un score de "+score;
			document.getElementById("annonce").innerHTML = "Votre avez trouvé le trésor pirate !!! ";
			var coffre_audio =  new Audio('/audio/coffre.mp3');
			gagné=1
			coffre_audio.play(60);
		}
		//Rayon de 1 autour du coffre
		else if ( (x==xt-1 && y==yt-1) || ((x==xt+1 || x==xt) && (y<=yt+1 && y>=yt-1))||((y==yt+1 || y==yt) && (x<=xt+1 && x>=xt-1))){
			caseTable.setAttribute('class','zone1');
			document.getElementById("annonce").innerHTML = "Votre êtes tout près ! ";
		}
		//Rayon de 2 autour   du coffre
		else if ( (x==xt-2 && y==yt-2) || ((x==xt+2 || x==xt) && (y<=yt+2 && y>=yt-2))||((y==yt+2 || y==yt) && (x<=xt+2 && x>=xt-2)) || (x==xt-2 &&(y>=yt-2 && y<=yt+2))||(y==yt-2 &&(x>=xt-2 && x<=xt+2))){
			caseTable.setAttribute('class','zone2');
			document.getElementById("annonce").innerHTML = "Il est dans les parages ! ";
		}
		
		//Cases bonus
		else if(xy == ab[q]){
			caseTable.setAttribute('class','bonus')
			score=score-3
			document.getElementById("score").innerHTML = "Votre score est de "+score;
			document.getElementById("annonce").innerHTML = "Quelques pièces en plus ! ";
			break;
		}

		//Cases malus
		else if(xy == cd[q]){
			caseTable.setAttribute('class','malus')
			score=score+1
			document.getElementById("score").innerHTML = "Votre score est de "+score;
			document.getElementById("annonce").innerHTML = "On se fait attaquer !!! ";
			var canon =  new Audio('/audio/canon.mp3');
			canon.play();

			break;
		}

		else if(xy == lp[q]){
			caseTable.setAttribute('class','lapin')
			document.getElementById("score").innerHTML = "Vous avez perdu ! ";
			document.getElementById("annonce").innerHTML = "Un lapin pirate fou vous tue ! ";
			setTimeout("location.reload(true);", 3000);
			break;
		}
		//Cases sans évenement particulier
		else {
			caseTable.setAttribute('class','bad');
			document.getElementById("annonce").innerHTML = "Il n'y a rien ici ! ";
		}
	}

}

}

function musique(){
	
	if (msc==0){
		var musique =  new Audio('/audio/musique.mp3');
		musique.play();
	}
	msc = 1
}

//Fonction pour écrire le score dans le formulaire
function scoore(){

	if (gagné==1){
		f = document.getElementById("idform");
		f.elements["score"].value=score;
	}

}

cases = []
msc=0
gagné=0
score=0
let tableau = tableau2D(10,10);
tresor(tableau);



