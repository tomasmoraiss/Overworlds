var playValues=[];

class BoardManager {
    
    constructor(width,height,x,y, match) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.match = match;
    }
    static async preloadImages() {
        let cardImgs = {}
        let cards = await getCards();
        for (let card of cards) {
            let playValue = card.crd_name;
            playValues.push(playValue);
            cardImgs[playValue] = loadImage('./assets/'+playValue+'.png');
        }
        Card.initImgs(cardImgs);
    } 
    async initBoard() {
        let match = await getMatch(this.match);
        this.board = new Board(this.width,this.height,this.x,this.y,
                match.roo_topcard, playValues);   
    }
    draw() { 
        if (this.board) this.board.draw(); 
    }
    async refresh () {
        let match = await getMatch(this.match);
        this.board.setMatchCard(match.roo_topcard);
    }
    async play(value) {
        let result = await play(this.match, value);
        this.board.setResult(result.victory);
        this.board.setMatchCard(result.current_topcard);
    }
    async click(x,y) {
        if (this.board.matchCardClicked(x,y)) {
            this.refresh();
        } else {
            let value = this.board.valueClicked(x,y);
            if (value) this.play(value);
        }
    }
}