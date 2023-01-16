import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SocialRecovery } from "../target/types/social_recovery";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

describe("social-recovery", () => {
  const provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.SocialRecovery as Program<SocialRecovery>;

  it("Is initialized!", async () => {
    // Add your test here.
    const authority = anchor.web3.Keypair.generate();
    const payer = (program.provider as anchor.AnchorProvider).wallet;

    const [recoveryWalletPDA, _] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("wallet"),
        authority.publicKey.toBuffer(),
      ],
      program.programId
    );

    const tx = await program.methods
      .initialize(authority.publicKey)
      .accounts({
        wallet: recoveryWalletPDA,
        payer: payer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([])
      .rpc();

    const walletState = await program.account.recoveryWallet.fetch(
      recoveryWalletPDA
    );

    expect(walletState.authority.toString() === authority.publicKey.toString());
  });
});
