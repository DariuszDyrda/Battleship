export const SHIPS = [
    {
        size: 4,
        amount: 1
    },
    {
        size: 3,
        amount: 2
    },
    {
        size: 2,
        amount: 3
    },
    {
        size: 1,
        amount: 4
    }
];

export let totalTargets = calculateTotalTargets();

function calculateTotalTargets() : number{
    return SHIPS.reduce((prev, current) => {
        return prev + (current.amount*current.size);
    }, 0);
}