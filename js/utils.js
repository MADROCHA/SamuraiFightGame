function rectCollision({
    rectangle1,
    rectangle2,
}){
    return(
        rectangle1.attackHitBox.position.x + rectangle1.attackHitBox.width >= rectangle2.position.x
    &&  rectangle1.attackHitBox.position.x <= rectangle2.position.x + rectangle2.size.width
    &&  rectangle1.attackHitBox.position.y + rectangle1.attackHitBox.height >= rectangle2.position.y
    &&  rectangle1.attackHitBox.position.y <= rectangle2.position.y + rectangle2.size.height
    )


}
//
function determineWinnerPlayer({playerA,playerB, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex';
    if(playerA.health === playerB.health){
            document.querySelector('#displayText').innerHTML = 'Tie';
        } else if(playerA.health > playerB.health) {
            document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
        } else if(playerB.health > playerA.health) {
            document.querySelector('#displayText').innerHTML = 'Player 2 Wins';

        }
    }
//
let timer = 61
let timerId
function decreaseTimer() {
    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if(timer === 0){
        
        determineWinnerPlayer({playerA, playerB, timerId })
    }
}