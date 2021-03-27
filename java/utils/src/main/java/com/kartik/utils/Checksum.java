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
   String body = "{\"token\":\"EAFAE5412323C51C694C1BDE53E8E0BD1D33932E4113680A800CBF93E33E269E729D60591AE174279755F057BB7A1CA69FF50B56A55304566EB9EBA1E57B428921CBEBBC53CF0D54BDCA649148D1D2B3C111A3A7F3C653723D7EA5CCFF944715785936303BAED0B13110950F201D89BBED7D5E0805BE91402BAC85EB8D2A80D814C9DBF590BC0A5907D135E64707C95E15A80C502847AA189B6D523ECE25E042AEA7A29134A0623EF231D7D9D468262CF972A245FAD0515C4DE0D37C7722089CD18BE82F7F56BD4901DA389AEB2A2F0BB4B500A19872CD01410DF21AD46B9E133996B58FB45834FAA98D233CFC475C227F42E5E9867A2682AF6A0EBC9DA2EED6925F0F14DED53B0718355D425734B001AF4A32A9FCA24B0053E22801E3ECA711573141F5E4A073D2A8E7C9B8CFAB7E036F18A762E5F7E64907B96A103BC31BB72B7299E71620AB77472B4E618B3960A645DD2DDAAFE912001747506AF4EF2A7BC03887B5CA040797A830F12CA50E6F29EB2CBA4616984881CE331D2EE879B16D5BB445ADF9D50CE150228D9A0C97C21FE7AF3D928CD006662374C3BCACA6EE7E4868CF8E40FAE3A51ECFD9BA4825056C6F4766C249837A3E80436902940286A75C8737B95672F9BEA4CBF36B32EAD8920AF9A983E03D4608E1CA358D7F35D25BC14E21E6AD2CA8349F4F4038AA242927C178A8586372A7DA2524113C6E33B9FE07C9DCCFCB9B9AB0487B73F6694D71CBF57FBAA48FA3EC397ACEC938A3447322F86D505BB6FBF200613ECF37DAFA18536774E2388DD3BF4107A3AB989424332112C0F578C0A9CC8CC3AC5DF9A7E782D20EB3D4D0340BAD16BAE2BD5520CEAFFA6738F609151F754A23ED30E00CD031104D1797339250B465968ECFD4E566F8E869984F99FFC99D761A2D8628082313AC\"}";
   String path = "";
   String key = "";
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

