package com.kartik.utils;
import com.google.common.base.Charsets;
import com.google.common.hash.Hasher;
import com.google.common.hash.Hashing;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.lang3.RandomStringUtils;
import java.io.BufferedReader;
import java.io.InputStreamReader;


public class Checksum {

  private static final Charset DEFAULT_CHARSET = Charsets.UTF_8;

  public static void main(String[] args) throws Exception {
   BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  //  String body = br.readLine();
  //  String path = br.readLine();
  //  String key = br.readLine();
   Map<String, String> env = System.getenv();
   String body = "";
   String path = "";
   String key = env.get("CHECKSUM_SECRET");
   System.out.println(
        generateChecksumHeader(key, path , body.getBytes())
    );
    br.close();
  }


  public static String generateChecksumHeader(String appKey, String path, byte[] body)
      throws Exception {
    String re = UUID.randomUUID().toString();
    System.out.println(re);
    String reqId = computeDesiredReqIdForChecksum(re);
    //System.out.println(reqId);
    String checksumStr = computeChecksum(path, body);

    String unencryptedStr = reqId + "###" + checksumStr;
    String salt = RandomStringUtils.random(6, true, true);
   // System.out.println(salt);
    String encryptionKey = generateKey(appKey, salt);
   // System.out.println(encryptionKey);
    String encryptedStr = encrypt(unencryptedStr, encryptionKey);
    String finalHeader = salt + "###" + encryptedStr;

    return new String(Base64.getEncoder().encode(
        finalHeader.getBytes()
    ));
  }

  private static String computeDesiredReqIdForChecksum(String reqId) {
    String modifiedRqId = Hashing.sha256()
        .hashString(reqId, StandardCharsets.UTF_8)
        .toString();

    if (modifiedRqId.length() < 13) {
      modifiedRqId = modifiedRqId + "0000000000000";
    }
    return modifiedRqId.substring(0, 13);
  }


  private static String computeChecksum(String path, byte[] body)
      throws UnsupportedEncodingException {
    Hasher hasher = Hashing.sha256().newHasher();
    hasher.putString(URLDecoder.decode(path, "UTF-8"), Charsets.UTF_8);
    if (null != body) {
      hasher.putBytes(body);
    }
    return hasher.hash().toString();
  }


  private static String encrypt(String input, String hashKey) throws Exception {
    byte[] key = Arrays.copyOf(
        Hashing.sha256().hashString(hashKey, Charsets.UTF_8).toString().getBytes(),
        16
    );
    IvParameterSpec ivSpec = new IvParameterSpec(key);
    Key secretKey = new SecretKeySpec(key, "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/NOPADDING");
    cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);
    byte[] encrypted = cipher.doFinal(input.getBytes(Charsets.UTF_8));
    return Base64.getEncoder().encodeToString(encrypted);
  }


  private static String generateKey(String sig, String salt) {
    if (sig.length() < 16) {
      sig = sig + "0000000000000000";
    }
    if (salt.length() < 16) {
      salt = salt + "0000000000000000";
    }

    sig = sig.substring(0, 16);
    salt = salt.substring(0, 16);
    byte[] sigBytes = sig.getBytes(DEFAULT_CHARSET);
    byte[] uuidBytes = salt.getBytes(DEFAULT_CHARSET);
    byte[] keyBytes = new byte[32];

    for (int i = 0; i < 16; ++i) {
      keyBytes[i * 2] = sigBytes[i];
      keyBytes[i * 2 + 1] = uuidBytes[i];
    }

    return new String(keyBytes, DEFAULT_CHARSET);
  }
}

