import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import Button from "components/ui/Button";

const AadhaarVerificationPanel = () => {
  const { user, token, updateUser } = useAuth();
  const [anonAadhaar] = useAnonAadhaar();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  React.useEffect(() => {
    console.log("Anon Aadhaar status:", anonAadhaar.status);
    
    if (anonAadhaar.status === "logged-in" && anonAadhaar.anonAadhaarProof) {
      handleAadhaarVerification();
    }
  }, [anonAadhaar]);

  const handleAadhaarVerification = async () => {
    setIsVerifying(true);
    setError('');
    setSuccess('');

    try {
      const zkProof = {
        nullifier: anonAadhaar.anonAadhaarProof.proof.nullifier,
        ageAbove18: anonAadhaar.anonAadhaarProof.proof.ageAbove18,
        gender: anonAadhaar.anonAadhaarProof.proof.gender,
        state: anonAadhaar.anonAadhaarProof.proof.state,
        pincode: anonAadhaar.anonAadhaarProof.proof.pincode,
        signalHash: anonAadhaar.anonAadhaarProof.proof.signalHash,
        timestamp: anonAadhaar.anonAadhaarProof.proof.timestamp
      };

      const response = await fetch('http://localhost:3001/api/auth/verify-aadhaar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ zkProof })
      });

      const data = await response.json();

      if (response.ok) {
        updateUser(data.user);
        setSuccess('Aadhaar verification successful! Your account now has enhanced security.');
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Aadhaar verification error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (user?.verification?.aadhaar) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Aadhaar Verified
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Your account is verified with Aadhaar using Zero-Knowledge Proof technology.</p>
              <p className="mt-1">
                <strong>Verified on:</strong> {new Date(user.aadhaarZKP?.verificationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Optional Aadhaar Verification
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p className="mb-3">
              Enhance your account security and help prevent spam by verifying your Aadhaar 
              using Zero-Knowledge Proof technology. This verification:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Keeps your Aadhaar number completely private</li>
              <li>Prevents spam and fake grievances</li>
              <li>Enables priority support</li>
              <li>Uses cryptographic proofs for verification</li>
            </ul>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded mb-3">
                {success}
              </div>
            )}

            <div className="mt-4">
              {isVerifying ? (
                <Button disabled className="w-full">
                  Verifying...
                </Button>
              ) : (
                <LogInWithAnonAadhaar 
                  nullifierSeed={user?.id || 'default-seed'}
                  fieldsToReveal={["revealAgeAbove18", "revealGender", "revealState", "revealPinCode"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerificationPanel;
