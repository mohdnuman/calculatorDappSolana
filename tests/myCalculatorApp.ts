import * as anchor from "@project-serum/anchor";
import assert from "assert";
const {SystemProgram}=anchor.web3;
import { Program } from "@project-serum/anchor";
import { MyCalculatorApp } from "../target/types/my_calculator_app";

describe("myCalculatorApp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const calculator=anchor.web3.Keypair.generate();
  const program = anchor.workspace.MyCalculatorApp as Program<MyCalculatorApp>;

  it("creates a calculator!", async () => {
    // Add your test here.
    const tx = await program.rpc.create("Hey",{
      accounts:{
        calculator:calculator.publicKey,
        user:program.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers:[calculator]
    });
    
    const account=await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.greeting==="Hey");

  });

  it("adds two numbers!", async () => {
    // Add your test here.
    const tx = await program.rpc.add(new anchor.BN(2),new anchor.BN(5),{
      accounts:{
        calculator:calculator.publicKey
      }
    });
    
    const account=await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.result.eq(new anchor.BN(7)));

  });

  
  it("substracts two numbers!", async () => {
    // Add your test here.
    const tx = await program.rpc.substract(new anchor.BN(5),new anchor.BN(2),{
      accounts:{
        calculator:calculator.publicKey
      }
    });
    
    const account=await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.result.eq(new anchor.BN(3)));

  });

  
  it("multiplies two numbers!", async () => {
    // Add your test here.
    const tx = await program.rpc.multiply(new anchor.BN(2),new anchor.BN(5),{
      accounts:{
        calculator:calculator.publicKey
      }
    });
    
    const account=await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.result.eq(new anchor.BN(10)));

  });

    
  it("divides two numbers!", async () => {
    // Add your test here.
    const tx = await program.rpc.divide(new anchor.BN(10),new anchor.BN(5),{
      accounts:{
        calculator:calculator.publicKey
      }
    });
    
    const account=await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.result.eq(new anchor.BN(2)));

  });
});

