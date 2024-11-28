// scripts/deploy.js
async function main() {
    const Notes = await ethers.getContractFactory("Notes");
    const notes = await Notes.deploy();
  
    await notes.deployed();
    console.log("Notes contract deployed to:", notes.address);
}
  
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
    