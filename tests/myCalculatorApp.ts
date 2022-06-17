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
});

