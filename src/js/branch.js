export class Branch {
    constructor(startX, startY, endX, endY, lineWidth, baseColor, maxDepth) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = `hsl(${baseColor}, 100%, ${50*(lineWidth/maxDepth) + 50}%)`;
        this.lineWidth = lineWidth;
        this.frame = 5; //가지를 100등분으로 나누기 위핸 변수 frame 선언
        this.cntFrame = 0; // 현재 frame
        // 가지의 길이를 frame으로 나누어 구간별 길이를 구함
        this.gapX = (this.endX - this.startX) / this.frame;
        this.gapY = (this.endY - this.startY) / this.frame;

        // 구간별 가지가 그려질 때 끝 좌표
        this.currentX = this.startX;
        this.currentY = this.startY;

    }

    draw(ctx) {
        // 가지를 다 그리면 true 리턴
        if(this.cntFrame === this.frame) return true;
        ctx.beginPath();

        // 구간별 길이를 더해주어 다음 구간의 끝 좌표를 구함
        this.currentX += this.gapX;
        this.currentY += this.gapY;

        ctx.moveTo(this.startX, this.startY);       // 선의 시작 위치 지정
        ctx.lineTo(this.currentX, this.currentY);   //선의 끝 위치 지정
        ctx.lineWidth = this.lineWidth;             // 선의 두께 
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        ctx.stroke();
        ctx.closePath();

        this.cntFrame++;

        // 다 안그렸으면 false를 리턴
        return false;
    }

    random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}