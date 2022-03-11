import { Branch } from "./branch.js";

export class Tree {
    constructor(ctx, posX, posY, baseColor) {
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.baseColor = baseColor;
        this.branches = []; // 가지들을 담을 공간
        this.depth = 11;     // depth 추가

        this.cntDepth = 0;  // depth별로 그리기 위해 현재 depth 변수 선언
        this.animation = null; // 현재 동작하는 애니매이션

        this.init();
    }

    init() {
        // depth별로 가지를 저장하기 위해 branches에 depth만큼 빈배열 추가
        for (let i = 0; i < this.depth; i++) {
            this.branches.push([]);
        }
        // 시작 각도는 -90초로 주어 아래에서 위로 나무 기둥이 자라도록한다
        // 시작 depth는 0으로 준다
        this.createBranch(this.posX, this.posY, -90, 0);
        this.draw()
    }

    createBranch(startX, startY, angle, depth) {
        if (depth === this.depth) return;
        // random 함수를 만들어 가지들의 길이를 랜덤으로 준다
        // depth가 0 즉, 나무 기둥을 그릴땐 최소, 최대 길이를 달리한다.
        // 가지 생성
        const len = depth === 0 ? this.random(5, 13) : this.random(0, 11);

        // 현재 depth의 역을 곱해주어 depth가 점점 늘어날 수록 길이가 가늘게 함
        const endX = startX + this.cos(angle) * len * (this.depth - depth);
        const endY = startY + this.sin(angle) * len * (this.depth - depth);
        const branchWidth = this.depth - depth; // 가지 굵기는 점점 얇게
        this.branches[depth].push(new Branch(startX, startY, endX, endY, branchWidth, this.baseColor, this.depth));

        // 각도도 랜덤하게 부여
        this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
        this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
    }

    draw() {
        // 다 그렸으면 requestAnimationFrame을 중단해 메모리 누수가 없게 함.
        if (this.cntDepth === this.depth) {
            cancelAnimationFrame(this.animation);
        }

        // depth별로 가지를 그리기
        for (let i = this.cntDepth; i < this.branches.length; i++) {
            let pass = true;
            for (let j = 0; j < this.branches[i].length; j++) {
                pass = this.branches[i][j].draw(this.ctx);
            }

            if (!pass) break;
            this.cntDepth++;
        }

        this.animation = requestAnimationFrame(this.draw.bind(this));
    }

    // 각도 관련 함수 추가
    cos(angle) {
        return Math.cos(this.degToRad(angle));
    }
    sin(angle) {
        return Math.sin(this.degToRad(angle));
    }
    degToRad(angle) {
        return (angle / 180.0) * Math.PI;
    }

    // random 함수 추가
    random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}