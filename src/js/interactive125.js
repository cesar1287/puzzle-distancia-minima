
var x=1;
var t1,t2,t3,t4;
var d;

var qboard, X, Y, OX, OY, O, M, A, B, AB ,C, D, CD;

function generateLadder(){

    qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -11, 10, 2, -2 ],  keepaspectratio: true, showcopyright: false, axis:true});

    //vertices
    Y = qboard.create('point', [0, 10], {color:'blue', withLabel:false, fixed:true});
    O = qboard.create('point', [0, 0], {color:'blue', withLabel:false, fixed:true, visible:false});
    X = qboard.create('point', [-10, 0], {color:'blue', withLabel:false, fixed:true});

    //hide useless points.
    Y.hideElement();
    X.hideElement();

    //sides
    OX = qboard.create('segment', [O, X], {color:'black', fixed:true});
    OY = qboard.create('segment', [O, Y], {color:'black', fixed:true});

    //B will be the sliding point
    B = qboard.create('point', [-10, 0], {name: "B", color:'red', label:{offset:[-10,-10]}});	
    B.makeGlider(OX);

    A = qboard.create('point', [0, function(){return (B.X()+10)/2;}] , {name: "A", color:'blue', label:{offset:[5, 10]}});
    //translation of the dog
    xm0=B.X();
    ym0=B.Y();
    var im = qboard.create('image', ['src/images/dog.png', [B.X()-1,B.Y()], [2,2]],{fixed:true});
    var tOff = qboard.create('transform', [function(){return B.X()-xm0;},function(){return B.Y()-ym0;}], {type:'translate'}); 
    tOff.bindTo(im);
    
    //translation of the balon
    xm01=A.X();
    ym01=A.Y();
    var im1 = qboard.create('image', ['src/images/balon.png', [A.X(),A.Y()], [1.5,1.5]],{fixed:true});
    var tOff1 = qboard.create('transform', [function(){return A.X()-xm01;},function(){return A.Y()-ym01;}], {type:'translate'}); 
    tOff1.bindTo(im1);

    AB = qboard.create('segment', [A, B], {name:"d", withLabel:true, color:'green', dash:2 });
    
    generateTexts();
    
    B.on("drag", function(){
        clearElements();
        generateTexts();
	});
		
}

function generateSolutionOnGraph(){
    C = qboard.create('point', [0, 4], {name:"C", withLabel:false, color:'yellow', fixed:true});
    D = qboard.create('point', [-2.02, 0], {name:"D", withLabel:false, color:'yellow', fixed:true});
    CD = qboard.create('segment', [C, D], {color:'yellow', dash:2 });
}

function showAnswer(){
    $("#showAnswer").attr("disabled",true);
    $("#answerExplanation").removeClass("hidden");
    $("#answerExplanation").html("<b>Solução:</b><br/>"+
    "<div class='justify'>Sabendo que a distância inicial entre o cachorro e o balão é de 10m e que ele corre a uma velocidade de 2m/s, temos que a função que determina a distância `(s)` em função do tempo `(t)`, entre o cachorro e o ponto de partida do balão é `s=10–2*t`.</div>"+
    "<div class='justify'>Já o balão, sobe a uma velocidade de 1m/s, assim temos que a distância (h) em função do tempo, entre o balão e seu ponto de partida é dada por `h = t`.</div>"+
    "<div class='justify'>Como o cachorro corre horizontalmente e o balão sobe verticalmente, podemos representar essa situação através do triângulo retângulo, onde: </div>"+
    "<div class='justify'><b>- Cateto 1)</b> A distância entre o cachorro e o ponto de partida do balão, ou seja, `s = 10−2*t`;</div>"+
    "<div class='justify'><b>- Cateto 2)</b> A distância do balão ao solo, ou seja, `h = t`.</div>"+
    "<div class='justify'><b>- Hipotenusa)</b> A distância entre o cachorro e o balão, que vamos chamar de d.</div>"+
    "<div class='justify'>Assim:</div>"+
    "<br/>"+
    "<div class='center'>`d^2 = (10 - 2*t)^2 + t^2 => d = sqrt((10-2*t)^2 + t^2) = sqrt (5*t^2-40*t+100)`</div>"+
    "<br/>"+
    "<div class='justify'>Como a função `y = sqrt(x)` é crescente, `d` será mínimo quando `5*t^2-40*t+100` também o for.</div>"+
    "<div class='justify'>Para uma função do tipo `f(t) = a*t^2 + b*t + c `, onde `a > 0`, o valor mínimo de `f(t)` se dá no `t` vértice, de valor: `t_v = (-b)/(2*a)`. Substituindo para os valores do problema:</div>"+
    "<br/>"+
    "<div class='center'>`t_v = (-(-40))/(2*5) = 4`</div>"+
    "<br/>"+
     "<div class='justify'>A parábola que representa a função quadrática do problema,é a seguinte:</div>"+
    "<br/>"+
    "<div class='center'><img src='src/images/parabola.png'></div>"+
    "<br/>"+
     "<div class='justify'> Substituindo o valor `t_v` na função:</div>"+
    "<br/>"+
    "<div class='center'>`d = sqrt((10-2*t_v)^2 + t_v^2) = sqrt((10-2*4)^2 + 4^2) = sqrt(20) = 2*sqrt(5) ~~ 4.47`</div>"+
    "<br/>"+
    "<div class='justify'>Logo, a distância mínima é `4.47m` e ocorre em `t_v = 4s`.</div>"+
    "<div class='justify'>Na figura, movimente o ponto B ao longo do eixo X para ver a variação da distância do cachorro para o balão em relação ao tempo.</div>"+
    "<div class='justify'>O segmento amarelo é a distância mínima procurada.</div>");
    generateSolutionOnGraph();
    compileMathJaxCode();
}

function resetAnswer(){
    $("#showAnswer").attr("disabled",false);
    $("#answerExplanation").addClass("hidden");
}

function generateTexts(){
    //texts
    //distance
    d = Math.sqrt((B.X()*B.X())+(A.Y()*A.Y())).toFixed(2);
    t1 =qboard.create('text',[-10, -1, "Cachorro = ("+B.X().toFixed(2)+","+B.Y().toFixed(2)+")"], {fixed:true});
    t2 =qboard.create('text',[-10, -2, "Balão = ("+A.X().toFixed(2)+","+A.Y().toFixed(2)+")"], {fixed:true});
    t3 =qboard.create('text',[-5, -1, "t = "+A.Y().toFixed(2)], {fixed:true});
    t4 =qboard.create('text',[-5, -2, "d = "+d], {fixed:true});
}

function clearElements(){
    t1.remove();
    t2.remove();
    t3.remove();
    t4.remove();
}

function compileMathJaxCode(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function generateNewGame(){
    resetAnswer();
    generateLadder();
}
