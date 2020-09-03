package com.kartik.compcoding;

class NumPrinter implements Runnable {

  boolean isEven;

  public NumPrinter() {
  }

  public NumPrinter(boolean isEven) {
    this.isEven = isEven;
  }

  @Override
  public void run() {
    int i = this.isEven ? 2 : 1;
    int end = this.isEven ? 21 : 20;
    for (; i < end; i += 2) {
      System.out.println(i);
      try {
        this.wait();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  public static void main(String[] args) {
    NumPrinter oddNums = new NumPrinter(false);
    NumPrinter evenNums = new NumPrinter(true);
    oddNums.run();
    evenNums.run();
  }


}
